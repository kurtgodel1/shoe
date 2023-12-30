import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook'; // Replace with your SVG import
import TwitterIcon from '@mui/icons-material/Twitter';   // Replace with your SVG import
import InstagramIcon from '@mui/icons-material/Instagram'; // Replace with your SVG import
import LinkedInIcon from '@mui/icons-material/LinkedIn';   // Replace with your SVG import
import YouTubeIcon from '@mui/icons-material/YouTube';     // Replace with your SVG import

export default function AppFooter() {
  return (
    <Box className="bg-gray-300 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200">
      <Grid container className="items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
        <Grid item className="hidden lg:block">
          <Typography>Get connected with us on social networks:</Typography>
        </Grid>
        <Grid item>
          <IconButton className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FacebookIcon />
          </IconButton>
          <IconButton className="mr-6 text-neutral-600 dark:text-neutral-200">
            <TwitterIcon />
          </IconButton>
          <IconButton className="mr-6 text-neutral-600 dark:text-neutral-200">
            <InstagramIcon />
          </IconButton>
          <IconButton className="mr-6 text-neutral-600 dark:text-neutral-200">
            <LinkedInIcon />
          </IconButton>
          <IconButton className="text-neutral-600 dark:text-neutral-200">
            <YouTubeIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container className="mx-6 py-10 text-center md:text-left" spacing={4}>
        {/* TW Elements Section */}
        <Grid item xs={12} md={6} lg={3} className='text-center'>
          <Typography variant="h6" gutterBottom className="font-semibold uppercase">
            TW Elements
          </Typography>
          <Typography>
            Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={6} lg={3} className='text-center'>
          <Typography variant="h6" gutterBottom className="font-semibold uppercase">
            Products
          </Typography>
          <Link href="#" className="block mb-4 text-neutral-600 dark:text-neutral-200">Angular</Link>
          <Link href="#" className="block mb-4 text-neutral-600 dark:text-neutral-200">React</Link>
          <Link href="#" className="block mb-4 text-neutral-600 dark:text-neutral-200">Vue</Link>
          <Link href="#" className="text-neutral-600 dark:text-neutral-200">Laravel</Link>
        </Grid>

        {/* Useful Links Section */}
        <Grid item xs={12} md={6} lg={3} className='text-center'>
          <Typography variant="h6" gutterBottom className="font-semibold uppercase">
            Useful Links
          </Typography>
          <Link href="#" className="block mb-4 text-neutral-600 dark:text-neutral-200">Pricing</Link>
          <Link href="#" className="block mb-4 text-neutral-600 dark:text-neutral-200">Settings</Link>
          <Link href="#" className="block mb-4 text-neutral-600 dark:text-neutral-200">Orders</Link>
          <Link href="#" className="text-neutral-600 dark:text-neutral-200">Help</Link>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={6} lg={3} className='text-center'>
          <Typography variant="h6" gutterBottom className="font-semibold uppercase">
            Contact
          </Typography>
          <Typography className="mb-4">
            <span className="mr-3">📍</span> New York, NY 10012, US
          </Typography>
          <Typography className="mb-4">
            <span className="mr-3">📧</span> info@example.com
          </Typography>
          <Typography className="mb-4">
            <span className="mr-3">📞</span> + 01 234 567 88
          </Typography>
          <Typography>
            <span className="mr-3">📱</span> + 01 234 567 89
          </Typography>
        </Grid>
      </Grid>

      <Box className="bg-neutral-200 p-6 dark:bg-neutral-700 text-center">
        <Typography>
          © 2023 Copyright:
          <Link href="https://tw-elements.com/" className="font-semibold text-neutral-600 dark:text-neutral-400">
            TW Elements
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
