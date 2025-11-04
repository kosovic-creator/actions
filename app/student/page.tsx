
// app/page.tsx (Server Component)
import { createItem, updateItem, deleteItem, getItems } from '@/actions/student'


interface Student {
    id: string | number;
    name: string;
    email: string;
}



export default async function Page() {
    const response: Response = await getItems()
    const items: Student[] = await response.json()


    return (
        <div>
            <div>
                <h1>CRUD with Server Actions</h1>

                <form action={createItem}>
                    <input name="name" type="text" placeholder="New item" required />
                    <input name="email" type="email" placeholder="Email" required />
                    <button type="submit">Create</button>
                </form>

                <ul>
                    {items.map((item: Student) => (
                        <li key={String(item.id)}>
                            <form action={updateItem}>
                                <input type="hidden" name="id" value={String(item.id)} />
                                <input name="name" placeholder='ime' defaultValue={item.name} />
                                <input name="email" placeholder='email' defaultValue={item.email} />
                                <button type="submit">Update</button>
                            </form>

                            <form action={deleteItem}>
                                <input type="hidden" name="id" value={String(item.id)} />
                                <button type="submit">Delete</button>
                            </form>
                        </li>
                    ))}
                </ul>


            </div>
            <div>
                <h1>Lista stavki kao tabela</h1>
                <table border={1} cellPadding={8} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Naziv</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: Student) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
