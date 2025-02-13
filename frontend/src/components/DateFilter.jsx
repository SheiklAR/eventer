import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const roles = [
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '10' },
    { label: '11' },
    { label: '12' },
];

export default function DateFilter({ dateFilter, setDateFilter }) {
  return (
    <Autocomplete
      id="tags-outlined"
      options={roles}
      getOptionLabel={(option) => option.label}
      value={dateFilter || null}
      onChange={(event, value) => setDateFilter(value)}
      filterSelectedOptions
      size='small'
      sx={{ width: 150 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Date"
          placeholder="Select Month"
        />
      )}
    />
  );
}