import { useToast } from "primevue/usetoast";

export const useToastLogic = () => {
    const toast = useToast();

    const toastInfo = (text: string, status: 'success' | 'error') => toast.add({
        severity: status,
        summary: text,
        life: 3000
    });

    return {toastInfo }
}
