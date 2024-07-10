import Container from '@/Components/Container'
import Header from '@/Components/Header'
import Table from '@/Components/Table'
import App from '@/Layouts/App'
import { numberFormat } from '@/Libs/Helper'
import { Inertia } from '@inertiajs/inertia'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import toast from 'react-hot-toast'

export default function Index({ carts }) {
    const onDeleteHandler = (cart_id) => {
        Inertia.post(route('cart.delete', cart_id), { _method: 'delete' }, {
            onSuccess: () => toast.success('Removed')
        });
    }
    return (
        <div>
            <Head title="Your carts" />
            <Header title='Your carts' description='The product was added to cart.' />

            <Container>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-0'}>#</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th className='text-right'>Price</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {carts.length ? (<>
                            {carts.map((cart, i) => (
                                <tr key={cart.id}>
                                    <Table.Td className={'w-0'}>{i + 1}</Table.Td>
                                    <Table.Td>
                                        <Link href={`/products/${cart.product.slug}`}>
                                            {cart.product.name}
                                        </Link>
                                    </Table.Td>
                                    <Table.Td className='text-right'>Rp {numberFormat(cart.price)}</Table.Td>
                                    <Table.Td className='text-right'>
                                        <button onClick={() => onDeleteHandler(cart.id)} className="focus:outline-none inline">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </button>
                                    </Table.Td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <Table.Td>Total</Table.Td>
                                <Table.Td className='text-right'>Rp {numberFormat(carts.reduce((acc, cart) => acc + cart.price, 0))}</Table.Td>
                            </tr>
                        </>
                        ) : <Table.Empty colSpan={4} message={<>
                            The cart is currently empty.
                            <br />
                            <Link href='/products' className='text-blue-500 underline'>Try add new one</Link>
                        </>} />}
                    </Table.Tbody>
                </Table>
            </Container>
        </div>
    )
}

Index.layout = page => <App children={page} />