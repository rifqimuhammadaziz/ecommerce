import React from 'react'
import Button from '@/Components/Button'
import Container from '@/Components/Container'
import App from '@/Layouts/App'
import { numberFormat } from '@/Libs/Helper'
import { Head, Link } from '@inertiajs/react'
import toast from 'react-hot-toast'
import { Inertia } from '@inertiajs/inertia'
import ButtonLink from '@/Components/ButtonLink'

export default function Show({ product, auth, isProductBought }) {
    const addToCart = () => {
        Inertia.post(route('cart.store', product), {}, {
            onSuccess: () => toast.success('success'),
        });
    }
    return (
        <div>
            <Head title={product.name} />

            <Container>
                <div className="flex gap-10">
                    <div className="w-1/3">
                        <img className="w-full rounded-lg" src={product.picture} alt="" />
                    </div>
                    <div className="w-2/3 min-h-full flex flex-col justify-between">
                        <div className="flex-1">
                            <Link className='text-xs font-semibold px-2 py-1 inline-flex bg-blue-500 text-white rounded' href={`/products?category=${product.category.slug}`}>{product.category.name}</Link>
                            <h1 className='text-3xl font-semibold'>{product.name}</h1>
                            <div className='leading-relaxed text-gray-500 my-4'>{product.description}</div>
                            <div className='font-semibold text-4xl'>
                                <sup>Rp</sup> {numberFormat(product.price)}
                            </div>
                        </div>
                        {auth.user ? <>
                            {isProductBought ?
                                < ButtonLink href='/products/me'> Already Bought </ButtonLink>
                                :
                                <Button onClick={addToCart}>Add to Cart</Button>}
                        </> : <></>}
                    </div>
                </div>
            </Container >
        </div >
    )
}

Show.layout = page => <App children={page} />