import { useState, ChangeEvent, ReactNode } from 'react';
import { Typography, IconButton, TextField, InputAdornment, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useToggle } from 'shared/hooks';
import { useTranslation } from 'react-i18next';
import { TranslationNamespace } from '../i18n';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export interface TableHeaderProps {
  title?: string | null;
  headerToolbar?: ReactNode;
  filterToolbar?: ReactNode;
  onSearch?: (term: string) => void;
}

export function TableHeader(props: TableHeaderProps) {
  const { t } = useTranslation([TranslationNamespace]);
  const tKey = 'data-table.table-header';
  const [areFiltersVisible, toggleFiltersVisibility] = useToggle(true);
  const [isSearchVisible, toggleSearchVisibility] = useToggle(true);
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const term = event.target.value;
    if (term !== searchTerm) {
      setSearchTerm(term);
      props.onSearch && props.onSearch(term);
    }
  }

  return (
    <HeaderContainer>
      <Title>{props.title}</Title>

      <ToolbarSection>
        <div>
          {props.headerToolbar}
        </div>

        {isSearchVisible &&
          <TextField
            // inputRef={(input) => input && input.focus()}
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            placeholder={t(`${tKey}.search`) ?? ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        }
        <IconButton
          color={isSearchVisible ? "primary" : "default"}
          onClick={toggleSearchVisibility}
          size="large"
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          color={areFiltersVisible ? "primary" : "default"}
          onClick={toggleFiltersVisibility}
          disabled={!props.filterToolbar}
          size="large"
        >
          <FilterListIcon />
        </IconButton>
      </ToolbarSection>

      <FiltersSection>
        <Collapse in={areFiltersVisible} timeout="auto" unmountOnExit>
          {props.filterToolbar}
        </Collapse>
      </FiltersSection>
    </HeaderContainer>
  );
}

const HeaderContainer = styled('header')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: '5px 0 5px 20px',
});

const ToolbarSection = styled('section')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

const FiltersSection = styled('section')({
  flex: '1 0 100%',
  padding: '16px 20px 16px 0',
});

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 600,
  fontSize: 18,
  color: theme.palette.text.secondary,
}));
