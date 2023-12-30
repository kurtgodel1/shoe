import { useState } from 'react';
import config from '../../config';
import { TextField, Button, Grid } from '@mui/material';


const DalleImageCreator = () => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const response = await fetch(`${config.API_URL}/api/generate-image/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt, apiKey: apiKey }),
    });
  
    const data = await response.json();
    setImageUrl(data.imageUrl); 
    setIsLoading(false);
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
          isLoading ? (
            <div>Loading...</div>
          ) : (
            <img src={imageUrl} alt="Generated" />
          )
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
