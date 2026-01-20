import dayjs from 'dayjs';

const CLASS_FORMAT = 'YYYY-MM-DD';

function classNameCommentDate(commentDate: Date) {
  return commentDate ? dayjs(commentDate).format(CLASS_FORMAT) : '';
}

export { classNameCommentDate };
