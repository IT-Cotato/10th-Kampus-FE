import Logo from "@/assets/imgs/kampusLogo.svg?react"
export const Market = () => {
    const text = "No products have been listed yet!\n Share your product:)"
    return (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col 
        justify-center items-center gap-4 overflow-hidden text-center whitespace-pre-line">
            <Logo className="text-neutral-disabled" />
            <p className="w-96 text-neutral-border-40">
                {text}
            </p>
        </div>
    )
}