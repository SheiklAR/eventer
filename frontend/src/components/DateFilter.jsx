import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const roles = [
    { label: '01' },
    { label: '02' },
    { label: '03' },
    { label: '04' },
    { label: '05' },
    { label: '06' },
    { label: '07' },
    { label: '08' },
    { label: '09' },
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