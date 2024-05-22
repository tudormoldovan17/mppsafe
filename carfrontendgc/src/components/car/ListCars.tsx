import React, { useEffect, useState } from 'react';
import CarService from "../../service/CarService";
import {Car} from "../../Types";
import {Typography, List, ListItem, ListItemText, Paper, Button, Grid, Box, Select, MenuItem} from '@mui/material';
import {useNavigate} from "react-router-dom";

const ListCars: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [page, setPage] = useState<number>(1);
    const [horsepowers, setHorsepowers] = useState<number[]>([]);
    const [selectedHorsepower, setSelectedHorsepower] = useState<number | null>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carData = await CarService.getCars(page);
                setCars(carData.results);
            } catch (error: any) {
                console.error('Error fetching cars:', error.message);
            }
        };

        const fetchHorsepowers = async () => {
            try {
                const hpData = await CarService.getHorsepowers();
                setHorsepowers(hpData);
            } catch (error: any) {
                console.error('Error fetching horsepower values:', error.message);
            }
        };

        fetchCars();
        fetchHorsepowers();
    }, [page]);

    useEffect(() => {
        const fetchCarsByHorsepower = async () => {
            try {
                const carData = await CarService.getCarsByHorsepower(selectedHorsepower ?? 0);
                setCars(carData);
            } catch (error: any) {
                console.error('Error fetching cars:', error.message);
            }
        };
        fetchCarsByHorsepower();
    }, [selectedHorsepower]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handleCarClick = (car: Car) => {
        navigate(`/car/${car.id}`);
    };

    const handleAddCar = () => {
        navigate('/addcar');
    }

    const handleUpdateButton = (car: Car) => {
        navigate(`/updatecar/${car.id}`, { state: { carData: car } });
    };

    const handleDeleteButton = (car: Car) => {
        navigate(`/deletecar/${car.id}`, { state: { carData: car } });
    };

    const handleHorsepowerChange = (event: number) => {
        const newValue = event as number;
        setSelectedHorsepower(newValue);
    };

    const handleChart = () => {
        navigate('/carchart');
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>List of Cars</Typography>
            <Button variant="contained" onClick={handleAddCar}>Add Car</Button>
            <Button variant="contained" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</Button>
            <Button variant="contained" onClick={handleNextPage}>Next Page</Button>
            <Button variant="contained" onClick={handleChart}>Car Chart</Button>
            <Box display="inline-block" marginLeft={2}>
                <Select
                    value={selectedHorsepower}
                    onChange={(event) => handleHorsepowerChange(event.target.value as number)}
                >
                    <MenuItem value={0}>All Horsepowers</MenuItem>
                    {horsepowers.map((hp) => (
                        <MenuItem key={hp} value={hp}>{`${hp} HP`}</MenuItem>
                    ))}
                </Select>
                {selectedHorsepower !== null && (
                    <Typography variant="body2" color="textSecondary">
                        Selected Horsepower: {selectedHorsepower} HP
                    </Typography>
                )}
            </Box>
            <Paper elevation={3} style={{ marginTop: '20px' }}>
                <List>
                    {cars.map((car) => (
                        <Grid container key={car.id}>
                            <Grid item xs={8} onClick={() => handleCarClick(car)}>
                                <ListItem button>
                                    <ListItemText
                                        primary={car.name}
                                        secondary={`Horsepower: ${car.horsepower}HP - Color: ${car.color} - Year: ${car.year} - Country: ${car.country}`}
                                    />
                                </ListItem>
                            </Grid>
                            <Grid item xs={4}>
                                <Box display="flex" justifyContent="flex-end" alignItems="center" paddingRight={2}>
                                    <Button variant="outlined" onClick={() => handleUpdateButton(car)}>Update</Button>
                                    <Button variant="outlined" onClick={() => handleDeleteButton(car)}>Delete</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default ListCars;
