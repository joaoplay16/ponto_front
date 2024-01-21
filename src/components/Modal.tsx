import Button from "./Button"

type ModalProps = {
  open: boolean
  tittle: string
  description: string
  onNegativeButtonClick: () => void
  onPositiveButtonClick: () => void
  positiveButtonText?: string
  negativeButtonText?: string
}

const Modal = ({
  open,
  tittle,
  description,
  onNegativeButtonClick,
  onPositiveButtonClick,
  positiveButtonText = "sim",
  negativeButtonText = "cancelar"
}: ModalProps) => {
  return (
    <div className={`z-10 `}>
      <div
        className={`fixed inset-0 bg-gray-500  bg-opacity-75  transition-all duration-300 ease-in-out ${open ? " opacity-100" : "h-0 w-0 opacity-0"} ease-in-out`}></div>

      <div
        className={`fixed inset-0 z-10  overflow-y-auto  transition-all duration-300 ${open ? "w-screen opacity-100" : "h-0  w-0 opacity-0"}  `}>
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 ">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title">
                    {tittle}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-2 bg-gray-50 px-6 py-3">
              <Button
                onClick={onNegativeButtonClick}
                type="button"
                className="!bg-red-700">
                {negativeButtonText}
              </Button>
              <Button
                onClick={onPositiveButtonClick}
                type="button"
                className="">
                {positiveButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
