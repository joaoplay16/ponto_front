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
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-watch"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>
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
