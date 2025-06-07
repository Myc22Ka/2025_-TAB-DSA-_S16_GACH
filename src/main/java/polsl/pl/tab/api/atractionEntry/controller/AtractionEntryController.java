package polsl.pl.tab.api.atractionEntry.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.atractionEntry.dto.AtractionEntryDetails;
import polsl.pl.tab.api.atractionEntry.service.AtractionEntryService;

import java.util.List;

@RestController
@RequestMapping("/api/atractionEntries")
@RequiredArgsConstructor
public class AtractionEntryController {

    private final AtractionEntryService atractionEntryService;

    @GetMapping("/details")
    public ResponseEntity<List<AtractionEntryDetails>> getAtractionEntryDetails() {
        return ResponseEntity.ok(atractionEntryService.getAllAtractionEntries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AtractionEntryDetails> getAtractionEntryDetailsFull(@PathVariable("id") Integer atractionEntryId) {
        AtractionEntryDetails atractionEntryDetails = atractionEntryService.getAtractionEntryById(atractionEntryId);
        return ResponseEntity.ok(atractionEntryDetails);
    }
}
