package polsl.pl.tab.api.atraction.dto;

public record AttractionDetails(
        String name,
        String description,
        String imageUrl,
        Double price,
        Integer maxPeopleAmount,
        Integer currentPeopleAmount) {
}
