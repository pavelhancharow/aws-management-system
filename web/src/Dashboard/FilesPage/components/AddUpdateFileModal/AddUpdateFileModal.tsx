import { useForm } from 'react-hook-form';
import { filesActions } from '../../../../shared/redux/files/slice';
import { useAppDispatch } from '../../../../shared/redux/store';
import { AddUpdateFileFormType } from '../../../../shared/types';
import { ReactComponent as FileBrowseIcon } from '../../../../shared/assets/icons/file-browse-icon.svg';
import { FormButtons } from '../../../../shared/ui-components';
import { AddUpdateFileForm } from './styles';

interface IAddUpdateFileModal {
  isLoading: boolean;
  onClose: () => void;
  fileId: string | null;
  getFiles: () => void;
}

const AddUpdateFileModal = ({ onClose, isLoading, fileId, getFiles }: IAddUpdateFileModal) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<AddUpdateFileFormType>({ defaultValues: { files: [] }, mode: 'onChange' });

  const formSubmit = async (data: AddUpdateFileFormType) => {
    if (!data) return;

    const formData = new FormData();
    let filename = '';

    if (data.files.length) {
      filename = data.files[0].name;
      formData.append("file", data.files[0], filename);
    }

    const file = data.files[0];

    const fileExtension = file.name.split('.').pop() || '-';
    const mimeType = file.type || 'application/octet-stream';

    let queryParams = {
      fileMime: mimeType,
      fileType: fileExtension
    };

    const callback = async () => {
      onClose();
      reset();
      await getFiles();
    };

    if (fileId) {
      await dispatch(filesActions.updateFiles({ data: { formData, queryParams: { fileId, ...queryParams } }, callback }));
    } else {
      await dispatch(filesActions.uploadFiles({ data: { formData, filename, queryParams }, callback }));
    }
  };

  const renderChosenFile = () => {
    if (errors.files) return 'No file chosen'

    if (watch('files').length) return watch('files')[0].name;

    return 'Choose file...';
  };

  return (
    <AddUpdateFileForm onSubmit={handleSubmit(formSubmit)}>
      <div>
        <label
          htmlFor="file"
          className={errors.files ? 'danger' : ''}
          data-error={errors?.files ? errors.files.message : ''}
        >
          <span>
            <FileBrowseIcon width={20} height={20} />
          </span>

          <div>{renderChosenFile()}</div>

          <input
            id="file"
            {...register("files", {
              required: {
                value: true,
                message: 'This field is required'
              }
            })}
            type="file"
            disabled={isLoading}
          />
        </label>
      </div>

      <FormButtons>
        <input type="submit" value={fileId ? 'Update' : 'Upload'} disabled={isLoading} />
        <input type="reset" value={"Reset"} onClick={() => reset()} disabled={isLoading} />
      </FormButtons>
    </AddUpdateFileForm>
  );
};

export default AddUpdateFileModal;