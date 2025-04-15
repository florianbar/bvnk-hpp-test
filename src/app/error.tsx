"use client";

import Container from "@/components/ui/container";
import ErrorView from "@/components/error-view";

export default function ErrorPage() {
  return (
    <Container>
      <ErrorView title="Error">Oops! There was an error.</ErrorView>
    </Container>
  );
}
