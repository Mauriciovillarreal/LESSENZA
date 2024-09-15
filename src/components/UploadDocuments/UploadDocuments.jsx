import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import axiosInstance from '../../AxiosInstance/AxiosInstance';
import './UploadDocuments.css';
import { toast } from 'react-toastify'; // Asegúrate de importar correctamente toast
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de toastify

const UploadDocuments = () => {
  const { user } = useContext(AuthContext);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [fileType, setFileType] = useState('document');
  const [productName, setProductName] = useState('');

  useEffect(() => {
  }, [user]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFiles) {
      toast.error('Por favor, selecciona al menos un archivo.', {
        position: 'bottom-left',  // Cambiar a 'bottom-left'
        style: {
          backgroundColor: "black",
          color: "white",
          borderRadius: "0px"
        },
        progressClassName: 'toastify__progress-bar',
        icon: () => (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        )
      });
      return;
    }

    const formData = new FormData();
    const fieldName = fileType === 'profile' ? 'profile' : fileType === 'product' ? 'products' : 'documents';

    Array.from(selectedFiles).forEach((file) => {
      formData.append(fieldName, file);
    });

    if (fileType === 'product') {
      formData.append('productName', productName);
    }

    try {
      const response = await axiosInstance.post(`/api/users/${user._id}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success('Archivos subidos exitosamente.', {
          position: 'bottom-left',  // Cambiar a 'bottom-left'
          style: {
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px"
          },
          progressClassName: 'toastify__progress-bar',
          icon: () => (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z" />
            </svg>
          )
        });
      } else {
        toast.error('Hubo un error al subir los archivos. Por favor, inténtalo nuevamente.', {
          position: 'bottom-left',  // Cambiar a 'bottom-left'
          style: {
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px"
          },
          progressClassName: 'toastify__progress-bar',
          icon: () => (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          )
        });
        console.error('Error en la respuesta del servidor:', response.data);
      }
    } catch (error) {
      toast.error('Hubo un error al subir los archivos. Por favor, inténtalo nuevamente.', {
        position: 'bottom-left',  // Cambiar a 'bottom-left'
        style: {
          backgroundColor: "black",
          color: "white",
          borderRadius: "0px"
        },
        progressClassName: 'toastify__progress-bar',
        icon: () => (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        )
      });
      console.error('Error al subir los archivos:', error);
    }
  };

  const handleUpgradeToPremium = async () => {
    try {
      const response = await axiosInstance.post(`/api/users/premium/${user._id}`);
      if (response.status >= 200 && response.status < 300) {
        toast.success('Cuenta actualizada a premium correctamente.', {
          position: 'bottom-left',  // Cambiar a 'bottom-left'
          style: {
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px"
          },
          progressClassName: 'toastify__progress-bar',
          icon: () => (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4L9 16.2z" />
            </svg>
          )
        });
      } else {
        toast.error('No se pudo actualizar la cuenta a premium.', {
          position: 'bottom-left',  // Cambiar a 'bottom-left'
          style: {
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px"
          },
          progressClassName: 'toastify__progress-bar',
          icon: () => (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          )
        });
        console.error('Error en la respuesta del servidor:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || 'No se pudo actualizar la cuenta a premium. Verifica la documentación.', {
          position: 'bottom-left',  // Cambiar a 'bottom-left'
          style: {
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px"
          },
          progressClassName: 'toastify__progress-bar',
          icon: () => (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          )
        });
      } else {
        toast.error('Hubo un error al intentar actualizar la cuenta a premium.', {
          position: 'bottom-left',  // Cambiar a 'bottom-left'
          style: {
            backgroundColor: "black",
            color: "white",
            borderRadius: "0px"
          },
          progressClassName: 'toastify__progress-bar',
          icon: () => (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          )
        });
      }
      console.error('Error al intentar actualizar la cuenta a premium:', error);
    }
  };

  return (
    <div className="upload-documents-container">
      <h2>Subir Documentos para Actualizar a Premium</h2>
      <p> Para actualizar tu cuenta a premium, es necesario subir los siguientes documentos.
        Asegúrate de que el nombre de los archivos subidos coincida exactamente con los requeridos,
        sin importar el tipo de archivo que sea (PDF, TXT, etc.).</p>
      <ul className="required-documents-list">
        <li>Identificación</li>
        <li>Comprobante de domicilio</li>
        <li>Comprobante de estado de cuenta</li>
      </ul>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="fileType">Tipo de Archivo:</label>
          <select id="fileType" value={fileType} onChange={handleFileTypeChange} className="form-select">
            <option value="profile">Imagen de Perfil</option>
            <option value="product">Imagen de Producto</option>
            <option value="document">Documento</option>
          </select>
        </div>

        {fileType === 'product' && (
          <div className="form-group">
            <label htmlFor="productName">Nombre del Producto:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
              className="form-input"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="files">Selecciona Archivos:</label>
          <input
            type="file"
            id="files"
            multiple
            name="file"
            onChange={handleFileChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="submit-button">Subir Archivos</button>
      </form>

      <button onClick={handleUpgradeToPremium} className="upgrade-button">
        Actualizar a Premium
      </button>
    </div>
  );
};

export default UploadDocuments;
