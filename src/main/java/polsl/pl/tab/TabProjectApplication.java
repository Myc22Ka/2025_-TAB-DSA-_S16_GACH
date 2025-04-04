package polsl.pl.tab;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
public class TabProjectApplication {

	@Value("${spring.profiles.active}")
	private String activeProfile;

	@PostConstruct
	public void logActiveProfile() {
		System.out.println("✅ Active Spring profile: " + activeProfile);
	}

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		System.setProperty("spring.datasource.username", Objects.requireNonNull(dotenv.get("DATABASE_USER")));
		System.setProperty("spring.datasource.password", Objects.requireNonNull(dotenv.get("DATABASE_PASSWORD")));

		SpringApplication.run(TabProjectApplication.class, args);
		
		System.out.println("Hi!");
	}

}
