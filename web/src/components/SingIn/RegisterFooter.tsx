interface RegisterFooter {
    title: string,
    href: string
    titlehref: string
}

export function RegisterFooter(props: RegisterFooter) {
    return (
        <div className="footer flex justify-center items-center mt-1 w-[520px]">
            <p className='text-base font-normal'>{props.title} <a className='text-sky-600 hover:text-red-300' href={props.href}>{props.titlehref}</a></p>
        </div>
    )
}