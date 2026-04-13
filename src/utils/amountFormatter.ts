export const formatAmount = (amount: number|string) => {
    const fomatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return fomatter.format(Number(amount));
}