import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { Product } from '../types/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ProductTabsProps {
    product: Product;
  }

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
    const [value, setValue] = useState(0);

    const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
      setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="mt-20 mb-20">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="product details tabs">
          <Tab label="Description" />
          <Tab label="Additional Information" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* Content for Description Tab */}
        <Typography>{product.description}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Content for Additional Information Tab */}
        <Typography>Additional Information...</Typography>
      </TabPanel>
    </Box>
  );
};

export default ProductTabs;
