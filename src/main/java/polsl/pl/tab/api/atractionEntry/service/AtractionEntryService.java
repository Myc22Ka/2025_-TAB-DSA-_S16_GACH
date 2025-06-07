package polsl.pl.tab.api.atractionEntry.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import polsl.pl.tab.api.atractionEntry.dto.AtractionEntryDetails;
import polsl.pl.tab.api.atractionEntry.model.AtractionEntry;
import polsl.pl.tab.api.atractionEntry.repository.AtractionEntryRepository;
import polsl.pl.tab.exception.AppException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AtractionEntryService {

    private final AtractionEntryRepository atractionEntryRepository;

    // Lista wszystkich entries w wersji uproszczonej
    public List<AtractionEntryDetails> getAllAtractionEntries() {
        return atractionEntryRepository.findAll()
                .stream()
                .map(e -> new AtractionEntryDetails(
                        e.getAtraction_id(),
                        e.getUser_id(),
                        e.getPeoplecount(),
                        e.getDuration()
                ))
                .toList();
    }

    // Szczegóły pojedynczego entry
    public AtractionEntryDetails getAtractionEntryById(Integer id) {
        AtractionEntry entry = atractionEntryRepository.findById(id)
                .orElseThrow(() -> new AppException("AtractionEntry not found with id: " + id));

        return new AtractionEntryDetails(
                entry.getAtraction_id(),
                entry.getUser_id(),
                entry.getPeoplecount(),
                entry.getDuration()
        );
    }
}
