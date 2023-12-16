// HeroSection.tsx
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography } from '@mui/material';
import ayakImage from './ayak.jpg';
import ayakImage2 from './ayak2.jpeg';
import './HeroSection.css';

interface ItemProps {
    item: {
        name: string;
        description: string;
        imgPath: string;
    };
}


const HeroSection : React.FC = () => {
    const items = [
        {
            name: "Discover Our Latest Collection",
            description: "Check out the latest trends in our collection.",
            imgPath: ayakImage,
        },
        {
            name: "Discover Our Latest Collection",
            description: "Check out the latest trends in our collection.",
            imgPath: ayakImage2,
        },
        // Add more items as needed
    ];

    return (
        <Carousel>
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
};

function Item(props: ItemProps) {
    return (
        <Paper className="hero-container">
            <img src={props.item.imgPath} alt={props.item.name} className="hero-image"/>
            <div className="hero-content">
                <Typography variant="h2" component="h1" className="hero-title">
                    {props.item.name}
                </Typography>
                <Typography>{props.item.description}</Typography>
                <Button className="hero-button" variant="contained" color="primary">
                    Shop Now
                </Button>
            </div>
        </Paper>
    );
}

export default HeroSection;
