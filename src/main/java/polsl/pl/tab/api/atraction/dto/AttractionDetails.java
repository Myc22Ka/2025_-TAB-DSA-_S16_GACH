package polsl.pl.tab.api.atraction.dto;

public record AttractionDetails(
        String name,
        String description,
        Integer maxPeopleAmount,
        Integer currentPeopleAmount) {
}
