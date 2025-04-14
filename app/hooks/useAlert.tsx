import { useState, useCallback } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'cart' | 'cancel';

type AlertOptions = {
  title?: string;
  message?: string;
  type?: AlertType;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm?: () => void;
};

export function useAlert() {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as AlertType,
    confirmText: 'OK',
    cancelText: 'Cancelar',
    showCancel: false,
    onConfirm: () => {},
  });

  const closeAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertState({
      isOpen: true,
      title: options.title || 'Aviso',
      message: options.message || '',
      type: options.type || 'info',
      confirmText: options.confirmText || 'OK',
      cancelText: options.cancelText || 'Cancelar',
      showCancel: options.showCancel || false,
      onConfirm: options.onConfirm || (() => {}),
    });
  }, []);

  // Predefined alert types
  const showSuccess = useCallback((message: string, onConfirm?: () => void) => {
    showAlert({
      title: 'Sucesso!',
      message,
      type: 'success',
      confirmText: 'OK',
      onConfirm,
    });
  }, [showAlert]);

  const showError = useCallback((message: string, onConfirm?: () => void) => {
    showAlert({
      title: 'Erro',
      message,
      type: 'error',
      confirmText: 'OK',
      onConfirm,
    });
  }, [showAlert]);

  const showWarning = useCallback((message: string, onConfirm?: () => void) => {
    showAlert({
      title: 'Aviso',
      message,
      type: 'warning',
      confirmText: 'Continuar',
      cancelText: 'Cancelar',
      showCancel: true,
      onConfirm,
    });
  }, [showAlert]);

  const showConfirm = useCallback((message: string, onConfirm?: () => void) => {
    showAlert({
      title: 'Confirmação',
      message,
      type: 'info',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      showCancel: true,
      onConfirm,
    });
  }, [showAlert]);

  const showPedidoConfirm = useCallback((valor: string | number, onConfirm?: () => void) => {
    showAlert({
      title: 'Confirmar Pedido',
      message: `Deseja confirmar seu pedido no valor de R$ ${valor}?`,
      type: 'cart',
      confirmText: 'Confirmar Pedido',
      cancelText: 'Cancelar',
      showCancel: true,
      onConfirm,
    });
  }, [showAlert]);

  const showCancelConfirm = useCallback((message: string, onConfirm?: () => void) => {
    showAlert({
      title: 'Cancelar',
      message: message || 'Deseja cancelar esta operação?',
      type: 'cancel',
      confirmText: 'Sim, Cancelar',
      cancelText: 'Não',
      showCancel: true,
      onConfirm,
    });
  }, [showAlert]);

  const showCartAlert = useCallback((message: string, onConfirm?: () => void) => {
    showAlert({
      title: 'Carrinho',
      message,
      type: 'cart',
      confirmText: 'OK',
      onConfirm,
    });
  }, [showAlert]);

  return {
    alertState,
    closeAlert,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showConfirm,
    showPedidoConfirm,
    showCancelConfirm,
    showCartAlert
  };
}
