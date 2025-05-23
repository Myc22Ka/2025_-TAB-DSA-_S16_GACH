package polsl.pl.tab.exception;

public record SuccessResponse(
        String timestamp,
        String message,
        int status
) {}
