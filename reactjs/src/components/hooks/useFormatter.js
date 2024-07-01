import { useCallback } from 'react';

const useFormatter = () => {

    const formatCurrency = useCallback((value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    }, []);

    const getCurrencySign = useCallback(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).formatToParts(1.0).find(part => part.type === 'currency').value;
    }, []);

    const formatInteger = useCallback((value) => {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0,
        }).format(value);
    }, []);

    return {
        formatCurrency,
        getCurrencySign,
        formatInteger,
    };
};

export default useFormatter;
