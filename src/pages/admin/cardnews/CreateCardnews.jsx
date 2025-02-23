import { cn } from '@/utils/cn';
import { useState } from 'react';
import XIcon from '@/assets/imgs/x.svg?react';
import ImgIcon from '@/assets/imgs/imgIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postCreateCardnews } from '@/apis/admin/postCreateCardnews.api';

export const CreateCardnews = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_TITLE_LENGTH = 50;

  /**
   * 제목 글자수 제한
   */
  const handleOnChange = (e) => {
    if (MAX_TITLE_LENGTH && e.target.value.length > MAX_TITLE_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_TITLE_LENGTH);
    }
    setTitle(e.target.value);
  };

  const getImageFiles = async (e) => {
    const newFiles = Array.from(e.target.files);

    const validFiles = newFiles.filter((file) => file.type.match('image/.*'));
    if (validFiles.length !== newFiles.length) {
      alert('이미지 파일만 업로드가 가능합니다.');
    }

    try {
      // Promise로 모든 미리보기 URL 생성
      const newPreviews = await Promise.all(
        validFiles.map((file) => {
          // URL 생성 중 오류 가능성 대비
          return new Promise((resolve, reject) => {
            try {
              resolve(URL.createObjectURL(file));
            } catch (error) {
              reject(error);
            }
          });
        }),
      );

      // 모든 파일과 미리보기가 준비된 후 상태 업데이트
      if (validFiles.length > 0 && newPreviews.length === validFiles.length) {
        const updatedFiles = [...files, ...validFiles];
        const updatedPreviews = [...previewImages, ...newPreviews];

        setFiles(updatedFiles);
        setPreviewImages(updatedPreviews);
        e.target.value = '';
      }
    } catch (error) {
      alert('파일 처리 중 오류가 발생했습니다.');
      return null;
    }
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation(); // 부모 요소로의 이벤트 전파 방지
    setIsDragging(true);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileInputEvent = {
      target: {
        files: e.dataTransfer.files,
      },
    };
    getImageFiles(fileInputEvent);
    setIsDragging(false);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeImage = (index) => {
    const urlToRevoke = previewImages[index];

    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
    if (previewIndex !== 0 && previewIndex === files.length - 1) {
      setPreviewIndex(previewIndex - 1); // 마지막 사진을 보고 있었을 경우 index-1
    }

    URL.revokeObjectURL(urlToRevoke); // URL 해제
  };

  const { mutate: createCardnews } = useMutation({
    mutationFn: postCreateCardnews,
  });

  const handleClickUpload = () => {
    // 업로드. 팝업도 있으면 좋을 듯...
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);

    files.forEach((file) => {
      formData.append('images', file); // 각 파일을 개별적으로 추가
    });

    createCardnews(
      { data: formData },
      {
        onSuccess: (response) => {
          console.log(response);
          navigate(-1);
        },
        onError: (err) => {
          alert(err.message);
        },
      },
    );
  };

  const isUploadButtonDisabled = !title || files.length === 0;
  return (
    <div className="flex flex-col flex-1 gap-5">
      <div className="flex flex-col w-full h-full gap-5 p-8 bg-white rounded-2xl">
        <h1 className="text-pageTitle">카드뉴스 업로드</h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            {/* 카드뉴스 제목 입력칸 */}
            <div
              className={cn(
                'box-border flex w-full flex-row gap-2 rounded-lg border border-neutral-border-40 px-3 py-2',
                {
                  'border-primary-base': title,
                },
              )}
            >
              <input
                type="text"
                placeholder="카드뉴스 제목"
                value={title}
                onChange={handleOnChange}
                autoComplete="off"
                className="w-full"
                required
              />
              <span className="flex justify-end text-sm w-fit text-neutral-border-50">
                {title.length}/{MAX_TITLE_LENGTH}
              </span>
            </div>

            <textarea
              cols={3}
              rows={10}
              value={content}
              className="flex w-full h-48 p-4 border resize-none rounded-xl border-neutral-border-30"
              placeholder="카드뉴스 본문을 입력하세요."
              onChange={(e) => setContent(e.target.value)}
            />

            {/* 카드뉴스 사진 선택 */}
            <div className="flex items-center justify-center w-full h-48 px-3 text-center align-middle border border-neutral-border-40">
              {/* 선택한 사진들 파일명 */}
              <div className="flex flex-col items-center w-full h-full gap-3 overflow-x-hidden overflow-y-auto text-center">
                {files.length !== 0 ? (
                  files.map((file, index) => (
                    <span
                      key={index}
                      className="box-border flex w-fit max-w-full items-center gap-3 rounded-[.625rem] border px-3 py-[.375rem]"
                    >
                      <img src={ImgIcon} />
                      <span className="truncate">{file.name}</span>
                      <XIcon
                        className="flex h-[.9375rem] w-[.9375rem] flex-shrink-0 cursor-pointer text-neutral-title"
                        onClick={() => removeImage(index)}
                      />
                    </span>
                  ))
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-neutral-border-50">
                    사진 파일을 선택하세요.
                  </span>
                )}
              </div>
            </div>

            {/* 드래그앤드롭 */}
            <div
              className={cn(
                'flex h-fit w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-neutral-border-40 bg-neutral-bg-5 py-5',
                {
                  'border-primary-30 bg-primary-5': isDragging,
                },
              )}
              onDragEnter={onDragEnter}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
            >
              <span className="flex gap-2 text-neutral-base">
                <img src={ImgIcon} />
                사진 파일을 드래그하여 첨부 가능
              </span>

              {/* 사진 선택 버튼 */}
              <label
                htmlFor="selectFile"
                className={cn(
                  'flex h-fit w-fit cursor-pointer items-center justify-center rounded-lg bg-primary-40 px-4 py-1 align-middle text-white',
                  {
                    'bg-neutral-border-40': isDragging,
                  },
                )}
              >
                Select file
              </label>
              <input
                type="file"
                multiple
                className="hidden"
                id="selectFile"
                accept="image/*"
                onChange={getImageFiles}
              />
            </div>
          </div>
          <div className="relative flex flex-col items-center h-full gap-4 p-5 text-center border rounded-lg">
            <h1 className="text-neutral-base">미리보기</h1>
            <div className="flex flex-col w-full align-top h-fit text-start">
              <h2
                className={cn('flex h-fit min-h-10 text-pageTitle', {
                  'text-neutral-border-50': !title,
                })}
              >
                {title ? title : '제목을 입력하세요'}
              </h2>
              <h2
                className={cn(
                  'flex h-fit min-h-10 w-full whitespace-pre-line text-base text-neutral-title',
                  {
                    'text-neutral-border-50': !content,
                  },
                )}
              >
                {content ? content : '본문이 없습니다.'}
              </h2>
            </div>
            <div className="flex items-center flex-1 align-middle">
              <div className="relative flex justify-center h-60 w-60 lg:h-80 lg:w-80">
                {previewIndex > 0 && (
                  <button
                    type="button"
                    className="absolute z-50 px-2 py-1 bg-white border left-3 top-1/2 rounded-xl border-primary-base text-primary-base"
                    onClick={() => setPreviewIndex(previewIndex - 1)}
                  >
                    이전
                  </button>
                )}
                {previewImages.length !== 0 &&
                  previewImages.map(
                    (src, index) =>
                      // 추후 사용자가 보는 카드뉴스 컴포넌트로 대체
                      previewIndex === index && (
                        <div
                          className="flex justify-center w-full h-full border"
                          key={index}
                        >
                          <img
                            src={src}
                            alt={`Preview ${index}`}
                            className="object-cover"
                          />
                        </div>
                      ),
                  )}
                {previewIndex < files.length - 1 && (
                  <button
                    type="button"
                    className="absolute z-50 px-2 py-1 bg-white border right-3 top-1/2 rounded-xl border-primary-base text-primary-base"
                    onClick={() => setPreviewIndex(previewIndex + 1)}
                  >
                    다음
                  </button>
                )}
              </div>
            </div>

            {/* 카드뉴스 업로드 버튼 */}
            <button
              type="button"
              className={cn(
                'bottom-2 w-full rounded-md bg-primary-base p-3 text-subTitle text-white',
                {
                  'bg-neutral-border-30': isUploadButtonDisabled,
                },
              )}
              disabled={isUploadButtonDisabled}
              onClick={handleClickUpload}
            >
              업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
