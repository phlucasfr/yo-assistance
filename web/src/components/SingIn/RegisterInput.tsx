interface RegisterInput {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    autocomplete: string
}

export function RegisterInput(props: RegisterInput) {
    return (
        <input className='flex flex-row items-start p-4 w-[520px] h-[49px] border-solid border-[1px] border-red-300 rounded-xl' type={props.type} name={props.name} id={props.id} placeholder={props.placeholder} autoComplete={props.autocomplete} />
    )
} 