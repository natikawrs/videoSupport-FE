import React from 'react'

interface CustomModalProps {
  isModalOpen: boolean
  closeModal: () => void
  errorMessage?: string | string[]
}

const CustomModal: React.FC<CustomModalProps> = ({
  isModalOpen,
  closeModal,
  errorMessage
}) => {
  return (
    <div>
      {/* Modal overlay */}
      {isModalOpen && (
        <div
          style={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={closeModal}
        >
          {/* Modal content */}
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px', 
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              border: '2px solid #993afc', 
              width: '400px' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center'
              }}
            >
              <h5 style={{ margin: 0 }}>Error Occurred</h5>
              <div style={{ marginTop: '10px' }}>
                {Array.isArray(errorMessage) ? (
                  <div>
                    {errorMessage.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                ) : (
                  <p>{errorMessage}</p>
                )}
              </div>
              <div style={{ marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: '8px 20px',
                    color: 'black',
                    border: '2px solid ',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomModal
