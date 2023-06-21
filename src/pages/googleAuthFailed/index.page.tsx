import Error from 'next/error';

export default function GoogleAuthFailed() {
	return <Error statusCode={500} />;
}
