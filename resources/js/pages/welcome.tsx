import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Tvello – Open Source Trello Clone">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                {/* Navbar */}
                <header className="mb-6 w-full max-w-[335px] lg:max-w-4xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-lg">
                            <img src="/tvello.png" className="h-7 w-7" alt="Tvello Logo" />
                            <span>Tvello</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md border border-[#19140035] px-4 py-1.5 hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-1.5 hover:underline"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md border border-[#19140035] px-4 py-1.5 hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex w-full max-w-4xl flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
                    <div className="flex-1 p-6 lg:p-12">
                        <h1 className="text-3xl font-bold mb-4">Tvello</h1>
                        <p className="text-[#706f6c] dark:text-[#A1A09A] mb-6 max-w-md">
                            An open-source Trello clone built with <b>Laravel</b>.
                            Simple, lightweight, and easy to run locally with <b>SQLite</b>.
                            Manage your projects the easy way 🚀
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                            <a
                                href={route('register')}
                                className="rounded-md bg-[#1b1b18] px-5 py-2 text-white hover:bg-black dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:bg-white"
                            >
                                Try the Demo
                            </a>
                            <a
                                href="https://github.com/nurbxfit/tvello"
                                target="_blank"
                                className="rounded-md border border-[#19140035] px-5 py-2 hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                            >
                                View on GitHub
                            </a>
                        </div>
                    </div>

                    {/* Logo / Illustration */}
                    <div className="flex-1 flex items-center justify-center p-6">
                        <div className="relative aspect-[4/3] w-full max-w-sm rounded-lg bg-[#fff2f2] p-6 dark:bg-[#1D0002] flex flex-col items-center justify-center">
                            <img src="/tvello.png" className="h-24 mb-4" alt="Tvello Logo" />
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Organize tasks with boards, lists & cards.
                            </p>
                            <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                        </div>
                    </div>
                </main>

                <footer className="mt-12 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                    <p>
                        Built with ❤️ using Laravel · Open Source on{' '}
                        <a
                            href="https://github.com/nurbxfit/tvello"
                            target="_blank"
                            className="underline hover:text-[#f53003]"
                        >
                            GitHub
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}
