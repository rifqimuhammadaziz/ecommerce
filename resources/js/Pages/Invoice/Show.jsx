import Container from '@/Components/Container'
import App from '@/Layouts/App'
import { Inertia } from '@inertiajs/inertia'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Show({ auth, invoice }) {
    Echo.private(`invoice.paid.${auth.user.id}`).listen('InvoicePaid', ({ invoice }) => {
        if (invoice.status == 'settlement') {
            Inertia.get('/products/me')
        }
    })
    return (
        <div>
            <Head title={`Your order - ${invoice.order_id}`} />

            <Container>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        {invoice.qr_code ? <img className='border shadow-sm rounded-lg' src={invoice.qr_code} alt="" /> : null}
                        {invoice.bank ?
                            <div>
                                <div className='p-2 rounded-lg text-blue-900 bg-gradient-to-r from-blue-200 via-transparent to-transparent'>
                                    <div><strong className="font-semibold uppercase">{invoice.bank.name}</strong> Virtual Account Number</div>
                                    <div>{invoice.bank.va_number}</div>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    <div>
                        <div className="prose">
                            <h3>Instruction</h3>
                            <p>Please follow the instruction below if you don't understand how to pay!</p>
                            <ol>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Quasi amet repellendus nesciunt placeat.</li>
                                <li>Fugit cum quia at ab!</li>
                                <li>Sed iure explicabo eaque recusandae.</li>
                                <li>Aspernatur unde amet laudantium nostrum!</li>
                                <li>Voluptatibus totam et tempora nemo!</li>
                                <li>Adipisci possimus hic nihil aperiam.</li>
                                <li>Eos illum laudantium nobis iure!</li>
                                <li>Maxime, molestiae tenetur! Debitis, cum?</li>
                                <li>Animi reprehenderit quisquam culpa amet!</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

Show.layout = page => <App children={page} />