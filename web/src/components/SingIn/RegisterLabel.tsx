interface RegisterLabel {
    title: string
}

export function RegisterLabel(props: RegisterLabel) {
    return (
        <label className='text-base font-normal mb-[2px]' htmlFor="loginUsu">{props.title}</label>
    )
}