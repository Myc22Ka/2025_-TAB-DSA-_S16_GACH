package polsl.pl.tab.api.management.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import polsl.pl.tab.api.management.dto.RoleChangeRequestDto;
import polsl.pl.tab.api.management.service.RoleChangeRequestService;
import polsl.pl.tab.api.management.model.Status;
import polsl.pl.tab.api.user.model.Role;

import java.util.List;

/**
 * Controller for handling role change requests.
 * Provides endpoints for creating, viewing, and updating role change requests.
 */
@RestController
@RequestMapping("/api/role-change-requests")
@AllArgsConstructor
public class RoleChangeRequestController {

    private final RoleChangeRequestService roleChangeRequestService;

    /**
     * Creates a new role change request for the authenticated user.
     *
     * @param requestedRole the role the user is requesting
     * @param authentication the authentication information of the current user
     * @return a ResponseEntity with no content if the request was successful
     */
    @PostMapping
    public ResponseEntity<RoleChangeRequestDto> createRequest(
            @RequestParam Role requestedRole,
            Authentication authentication) {

        roleChangeRequestService.createRequest(requestedRole, authentication);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves all role change requests for the authenticated user.
     *
     * @param authentication the authentication information of the current user
     * @return a ResponseEntity containing a list of RoleChangeRequestDto objects
     */
    @GetMapping
    public ResponseEntity<List<RoleChangeRequestDto>> getAllRequests(Authentication authentication) {
        return ResponseEntity.ok(roleChangeRequestService.getAllRequests(authentication));
    }

    /**
     * Updates the status of a role change request identified by its ID.
     *
     * @param id the ID of the role change request to be updated
     * @param newStatus the new status to be set for the request
     * @param authentication the authentication information of the current user
     * @return a ResponseEntity with no content if the update was successful
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateRequestStatus(@PathVariable Long id, @RequestParam Status newStatus, Authentication authentication) {
        roleChangeRequestService.updateRequestStatus(id, newStatus, authentication);

        return ResponseEntity.noContent().build();
    }
}

