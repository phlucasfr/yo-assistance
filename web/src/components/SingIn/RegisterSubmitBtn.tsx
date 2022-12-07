interface RegisterSubmitBtn {
    onClick: any
}

export function RegisterSubmitBtn(props: RegisterSubmitBtn) {
    return (
        <button onClick={props.onClick} className="button flex flex-row justify-center items-center w-[520px] h-[48px] rounded-xl hover:bg-red-300 bg-red-400 mt-2 text-base">
            Submit <img src="" alt="" />
        </button>

    )
}