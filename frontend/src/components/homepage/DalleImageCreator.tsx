import { useState } from 'react';
import config from '../../config';
import { TextField, Button, Grid } from '@mui/material';


const DalleImageCreator = () => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useState(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const handleCreateImage = async () => {
    const response = await fetch(`${config.API_URL}/api/generate-image/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt, apiKey: apiKey }),
    });
  
    const data = await response.json();
    setImageUrl(data.imageUrl); 
    //setImageUrl("https://articonics.s3.eu-north-1.amazonaws.com/product_images/natureillustration2.png");
  };

  return (
    <Grid container spacing={2} className="h-full">
      <Grid item xs={12}>
        <TextField 
          label="Enter your API Key" 
          variant="outlined" 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} 
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={true}>
        <TextField 
          label="Prompt" 
          variant="outlined" 
          multiline 
          rows={isMobile ? 3 : 1}
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm="auto" className="flex items-center">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateImage}
          fullWidth={window.innerWidth < 768}
        >
          Create
        </Button>
      </Grid>
      <Grid item xs={12} className="flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="Generated from DALL-E" className="max-w-full max-h-[70vh]" />
        ) : (
          <div className="w-full bg-gray-200 flex items-center justify-center h-[70vh]">
            <span className="text-gray-500">Image will appear here</span>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default DalleImageCreator;
