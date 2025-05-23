package polsl.pl.tab.api.management.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.api.management.model.RoleChangeRequest;
import polsl.pl.tab.api.management.repository.RoleChangeRequestRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class RoleChangeInitializer {

//    private final RoleChangeRequestRepository roleChangeRepository;
//
//    @Bean
//    public CommandLineRunner initRoleChanges(ObjectMapper objectMapper) {
//        return args -> {
//            if (roleChangeRepository.count() == 0) {
//                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/role_change_requests.json")) {
//                    if (is == null) {
//                        throw new IllegalArgumentException("Could not find static/role_change_requests.json in classpath.");
//                    }
//
//                    RoleChangeWrapper wrapper = objectMapper.readValue(is, RoleChangeWrapper.class);
//                    roleChangeRepository.saveAll(wrapper.getRoleChanges());
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        };
//    }
//
//    @Getter
//    @Setter
//    public static class RoleChangeWrapper {
//        private List<RoleChangeRequest> roleChanges;
//    }
}
