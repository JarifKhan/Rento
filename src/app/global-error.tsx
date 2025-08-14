"use client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<body>
				<div className="min-h-screen flex items-center justify-center p-6 bg-white">
					<div className="max-w-md w-full text-center">
						<h2 className="text-2xl font-semibold text-slate-800 mb-2">
							Application error
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
			</body>
		</html>
	);
}
