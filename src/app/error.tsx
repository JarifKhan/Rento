"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// You can log the error to an error reporting service
		// console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
			<div className="max-w-md w-full bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-slate-200 p-6 text-center">
				<h2 className="text-2xl font-semibold text-slate-800 mb-2">
					Something went wrong
				</h2>
				{error?.digest && (
					<p className="text-xs text-slate-400 mb-4">
						Error ID: {error.digest}
					</p>
				)}
				<div className="flex gap-3 justify-center">
					<button
						onClick={() => reset()}
						className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
					>
						Try again
					</button>
					<button
						onClick={() => (window.location.href = "/")}
						className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
					>
						Go home
					</button>
				</div>
			</div>
		</div>
	);
}
