import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const alertas = (titulo: any, mensaje: any, icon: any) => {
    MySwal.fire({
        title: titulo,
        text: mensaje,
        icon: icon,
        confirmButtonText: 'Aceptar',
      }); 
};

const deleteConfirmation = (
  onConfirm: () => void, 
  options: {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    successTitle?: string;
    successText?: string;
    errorTitle?: string;
    errorText?: string;
  } = {}
) => {
  const {
    title = '¿Estás seguro?',
    text = '¿Deseas eliminar este elemento?',
    confirmButtonText = 'Sí, eliminar',
    cancelButtonText = 'Cancelar',
    confirmButtonColor = '#10b981',
    cancelButtonColor = '#ef4444',
    successTitle = '¡Eliminado!',
    successText = 'El elemento ha sido eliminado con éxito.',
    errorTitle = 'Error',
    errorText = 'No se pudo eliminar el elemento.'
  } = options;

  MySwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        onConfirm();
      } catch (error) {
        console.error('Error en la operación de eliminación:', error);
        MySwal.fire({
          title: errorTitle,
          text: errorText,
          icon: 'error',
          confirmButtonColor
        });
      }
    }
  });
};

export { alertas, deleteConfirmation };
export default alertas;