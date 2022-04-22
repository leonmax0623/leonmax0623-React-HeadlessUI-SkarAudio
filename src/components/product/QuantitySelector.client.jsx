export function ProductQuantitySelector({ quantity, setQuantity }) {

    const allowedNumbers = Array(1000).fill().map((v,i)=>i+1);

    const setQtyProtected = (qty) => {
        if (allowedNumbers.includes(qty)) {
            setQuantity(qty);
        }
    }

    const handleChange = (event) => {
        const value = Number(event.target.value || '' );
        setQtyProtected(value);
    }

    const handleArrowChange = (event) => {
        const value = Number(event.target.value || '' );
        if (event.key === 'ArrowUp') {
            setQtyProtected(value + 1);
        } else if (event.key === 'ArrowDown') {
            setQtyProtected(value - 1);
        }
    }

    return (
        <>
            <div className='flex mr-2'>

                <button
                    className='
                        border-2
                        font-medium
                        text-2xl
                        lg:px-4
                        lg:py-1
                        sm:px-2
                        sm:py-1
                        bg-black-900
                        hover:bg-gray-100
                    '
                    style={{height: '46px'}}
                    onClick={(e) => setQtyProtected(quantity-1)}
                >
                    -
                </button>
                <input
                    type="text"
                    name='product-qty'
                    style={{width: '80px', height: '46px'}}
                    pattern="[0-9]*"
                    onInput={(e) => handleChange(e)} value={quantity}
                    onKeyDown={(e) => handleArrowChange(e)}
                    className='
                        border-2
                        lg:px-4
                        lg:py-2
                        sm:px-2
                        sm:py-1
                        text-center
                    '
                />
                <button
                    className='
                        border-2
                        font-medium
                        text-2xl
                        lg:px-4
                        lg:py-1
                        sm:px-2
                        sm:py-1
                        bg-black-900
                        hover:bg-gray-100
                    '
                    style={{height: '46px'}}
                    onClick={(e) => setQtyProtected(quantity + 1)}
                >
                    +
                </button>
            </div>

        </>
    );
}