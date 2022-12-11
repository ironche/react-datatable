import { useEffect, useState, useMemo, ChangeEvent } from 'react';
import { Button, Link, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { TranslationNamespace } from '../../i18n';
import { GithubAPI, Repository } from 'api/github';
import { DataTable, DataTableCol, DataTableRow } from 'shared/components/datatable';
import { useDebounce } from 'shared/hooks/debounce';
import { useHomeContext } from '../../state';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LaunchIcon from '@mui/icons-material/Launch';

type RepositoryProp = keyof Repository;

export default function WelcomePage() {
  const { state, dispatch, Actions } = useHomeContext();
  const { t } = useTranslation([TranslationNamespace]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const tKey = 'pages.welcome';
  const org = 'bosch-io';

  const columnDefs: DataTableCol[] = [
    {
      field: 'name' as RepositoryProp,
      headerName: t(`${tKey}.datatable.columns.name`),
      renderHeader(headerName) {
        return <NoWrapCell>{headerName}</NoWrapCell>;
      },
      renderCell(cellValue, rowValue) {
        return <NoWrapCell>{cellValue}</NoWrapCell>;
      },
    },
    {
      field: 'description' as RepositoryProp,
      headerName: t(`${tKey}.datatable.columns.desc`),
    },
    {
      field: 'language' as RepositoryProp,
      headerName: t(`${tKey}.datatable.columns.lang`),
      renderHeader(headerName) {
        return <NoWrapCell>{headerName}</NoWrapCell>;
      },
    },
    {
      field: 'html_url' as RepositoryProp,
      headerName: t(`${tKey}.datatable.columns.url`),
      renderHeader(headerName) {
        return '';
      },
      renderCell(cellValue: string, rowValue: Repository) {
        return (
          <Link
            href={cellValue}
            target="_blank"
            rel="noreferrer"
            title={t(`${tKey}.datatable.open-link`) ?? ''}
          >
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const columnFields = columnDefs.map((cdef) => cdef.field as RepositoryProp);

  const rows = useMemo<DataTableRow[]>(() => {
    let results = state.repositories;
    if (debouncedSearch) {
      results = state.repositories.filter((repo) => {
        let cols = columnFields;
        if (state.filterBy) {
          cols = cols.filter((c) => c === state.filterBy);
        }
        return cols.map((c) => repo[c]).filter(Boolean).some((value) => {
          return new RegExp(debouncedSearch, 'i').test(value.toString());
        });
      });
    }
    return results;
  }, [state.repositories, debouncedSearch, state.filterBy]);

  function fetchData(): void {
    dispatch(Actions.setLoading(true));
    GithubAPI.getOrganization(org)
      .then((organization) => {
        if (organization.id) {
          dispatch(Actions.setOrganization(organization));
          return GithubAPI.getAllOrganizationRepos(org, organization.public_repos);
        }
      })
      .then((repositories) => {
        dispatch(Actions.setRepositories(repositories));
      })
      .finally(() => {
        dispatch(Actions.setLoading(false));
      });
  }

  // useEffect(fetchData, [state.page, state.pageSize]);

  useEffect(fetchData, []);

  useEffect(() => {
    dispatch(Actions.setLoading(false));
  }, [rows]);

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>): void {
    dispatch(Actions.filterBy(event.target.value));
  }

  return (
    <>
      <DataTable
        cols={columnDefs}
        rows={rows}
        isSparseTable={false}
        isLoading={state.isLoading}
        title={t(`${tKey}.datatable.title`) + `: ${org}`}
        totalRows={rows.length ?? 0}
        pageSizeOptions={state.pageSizes}
        headerToolbar={
          <HeaderToolbar>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CloudDownloadIcon />}
              onClick={fetchData}
            >
              {t(`${tKey}.datatable.refetch`)}
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => console.log(state)}
            >
              {t(`${tKey}.datatable.debug`)}
            </Button>
          </HeaderToolbar>
        }
        filterToolbar={
          <FormControl>
            <FormLabel>{t(`${tKey}.datatable.filter-by`)}</FormLabel>
            <InlineRadioGroup
              value={state.filterBy}
              onChange={handleFilterChange}
            >
              <FormControlLabel value="" control={<Radio />} label="*" />
              {columnFields.map((f, i) =>
                <FormControlLabel key={i} value={f} control={<Radio />} label={f} />
              )}
            </InlineRadioGroup>
          </FormControl>
        }
        onSearch={(term) => {
          dispatch(Actions.setLoading(true));
          setSearch(term);
        }}
        onSetPage={(value) => dispatch(Actions.setPage(value))}
        onSetPageSize={(value) => dispatch(Actions.setPageSize(value))}
      />
    </>
  );
}

const NoWrapCell = styled('span')({
  whiteSpace: 'nowrap',
});

const HeaderToolbar = styled('div')({
  display: 'flex',
  gap: 10,
});

const InlineRadioGroup = styled(RadioGroup)({
  flexDirection: 'row',
});
