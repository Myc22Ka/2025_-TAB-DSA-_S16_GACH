package polsl.pl.tab.api.user.dto;

import polsl.pl.tab.api.user.model.User;

public record InstructorDetails(
        Integer id,
        String login,
        String firstname,
        String lastname,
        String photoUrl,
        String phoneNumber
) {
        public static InstructorDetails fromEntity(User user) {
                return new InstructorDetails(
                        user.getId(),
                        user.getLogin(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getPhotoUrl(),
                        user.getPhoneNumber()
                );
        }
}