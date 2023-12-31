import { useState, useEffect } from 'react';

import axios from 'axios';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';

import CustomersCard from '../../components/customerCard';



const Customers = () => {
    
    const navigate = useNavigate()

    const [customers, setCustomers] = useState([])


    useEffect(()=> {
        axios.get('https://reqres.in/api/users')
            .then(response => {
                const { data } = response.data
                setCustomers(data)
        })
    },[])

    // Apagando o cliente
    const handleRemoveCustomer = id => { 
        axios.delete(`https://reqres.in/api/users/${id}`)	
        .then(() => {
            const newCustomersState = customers.filter(customer => customer.id !== id)
            
            setCustomers(newCustomersState)
        })
    }

        const handleEditCustomer = id => {
            navigate(`/customers/edit/${id}`) // redirecionando para o edit baseado no ID do cliente que foi clicado
        }

    return (

            <Grid container spacing={2}>
                {
                    customers.map(customer => (
                        <Grid item p={2}
                        container xs={12} sm={6} md={4} lg={4} xl={4}>
                            <CustomersCard 
                                id={customer.id}
                                name={customer.first_name}
                                lastname={customer.last_name}
                                email={customer.email}
                                avatar={customer.avatar}
                                onRemoveCustomer={handleRemoveCustomer}
                                onEditCustomer={handleEditCustomer}
                
                            />
                        </Grid>      
                    ))
                } 
            </Grid>
    )
}

export default Customers