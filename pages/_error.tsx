import Head from 'next/head';
import style from './_error.scss';

export default function Error() {
  return (
    <div className={style.root}>
      <Head>
        <title>ثبت نام | صفحه مورد نظر یافت نشد</title>
      </Head>
      <p className={style.title}>404</p>
      <p className={style.message}>صفحه مورد نظر یافت نشد</p>
    </div>
  );
}
