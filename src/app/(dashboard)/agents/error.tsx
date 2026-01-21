"use client";

import { ErrorState } from "@/components/error-state";

const ErrorPage = () => {
    return (
        <ErrorState
            title="Something went wrong"
            description="Please try again later."
        />
    );
}

export default ErrorPage;