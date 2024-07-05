import Container from '@/Components/Container'
import Header from '@/Components/Header';
import ProductItem from '@/Components/ProductItem';
import App from '@/Layouts/App'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Index(props) {
    const { data: products, meta, links } = props.products;
    return (
        <div>
            <Head title="Products" />
            <Header title='Our Product' description='Lorem ipsum dolor sit amet' />
            <Container>

                {products.length ?
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                        {
                            products.map(product => (
                                <ProductItem product={product} key={product.id} />
                            ))
                        }
                    </div>
                    : null
                }
            </Container>
        </div>
    )
}

Index.layout = page => <App children={page} />
