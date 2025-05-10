package polsl.pl.tab.api.atraction.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.atraction.dto.AttractionDetails;
import polsl.pl.tab.api.atraction.dto.AttractionDetailsFull;
import polsl.pl.tab.api.atraction.dto.OpeningHourDTO;
import polsl.pl.tab.api.atraction.service.AttractionService;

import java.util.List;

@RestController
@RequestMapping("/api/attractions")
@RequiredArgsConstructor
public class AttractionController {

    private final AttractionService attractionService;

    @GetMapping("/details")
    public ResponseEntity<List<AttractionDetails>> getAttractionsDetails() {
        return ResponseEntity.ok(attractionService.getAttractionDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttractionDetailsFull> getAttractionDetailsFull(@PathVariable("id") Integer attractionId) {
        AttractionDetailsFull attractionDetailsFull = attractionService.getAttractionDetails(attractionId);
        return ResponseEntity.ok(attractionDetailsFull);
    }

    @GetMapping("/opening-hours")
    public ResponseEntity<List<OpeningHourDTO>> getAttractionsWithOpeningHours() {
        List<OpeningHourDTO> result = attractionService.getAllAttractionsWithOpeningDays();
        return ResponseEntity.ok(result);
    }
}
