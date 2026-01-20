import { Result } from 'antd';
import { ResultProps } from 'antd/es/result';

function ErrorScreen({ title, subTitle, extra, style }: ResultProps): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Result
        status="500"
        title={title || '404'}
        subTitle={subTitle || 'Извините, страница, которую вы посетили, не существует.'}
        extra={extra}
        style={style}
      />
    </div>
  );
}

export default ErrorScreen;
