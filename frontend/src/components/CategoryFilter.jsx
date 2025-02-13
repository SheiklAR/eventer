import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const roles = [
  { label: 'Cooking' },
  { label: 'Design' },
  { label: 'Speech' },
  { label: 'Gaming' },
  { label: 'Marketing' },
  { label: 'Motivation' },
  { label: 'Tech & Science' },
];

export default function CategoryFilter({ categoryFilter, setCategoryFilter }) {
  return (
    <Autocomplete
      id="tags-outlined"
      options={roles}
      getOptionLabel={(option) => option.label}
      value={categoryFilter || null}
      onChange={(event, value) => setCategoryFilter(value)}
      filterSelectedOptions
      size='small'
      sx={{ width: 200 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="category"
          placeholder="Select Category"
        />
      )}
    />
  );
}