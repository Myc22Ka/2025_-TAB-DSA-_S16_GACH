package polsl.pl.tab.auth.initializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import polsl.pl.tab.auth.model.Token;
import polsl.pl.tab.auth.repository.TokenRepository;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class TokenInitializer {

//    private final TokenRepository tokenRepository;
//
//    @Bean
//    public CommandLineRunner initTokens(ObjectMapper objectMapper) {
//        return args -> {
//            if (tokenRepository.count() == 0) {
//                try (InputStream is = getClass().getClassLoader().getResourceAsStream("static/token.json")) {
//                    if (is == null) {
//                        throw new IllegalArgumentException("Could not find static/tokens.json in classpath.");
//                    }
//
//                    TokensWrapper wrapper = objectMapper.readValue(is, TokensWrapper.class);
//                    tokenRepository.saveAll(wrapper.getTokens());
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        };
//    }
//
//    @Getter
//    @Setter
//    public static class TokensWrapper {
//        private List<Token> tokens;
//    }
}
